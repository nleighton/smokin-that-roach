using System.Collections;
using Scalar.AspNetCore;
using System.Security.Cryptography;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Net;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("roach");
var collection = database.GetCollection<User>("users");

BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
 
app.MapGet("/users/create", async (string username, string password) =>
{
    var existingUser = await collection.Find(u => u.Username == username).FirstOrDefaultAsync();

    if (existingUser != null) {
        return HttpStatusCode.Conflict;
    }

    var user = new User(username, User.HashPassword(password), Guid.NewGuid());
    await collection.InsertOneAsync(user);

    var users = await collection.Find(_ => true).ToListAsync();

    Console.WriteLine("New account created.");
    Console.WriteLine($"Name: {user.Username}");
    Console.WriteLine($"Encrypted Password: {user.Password}");
    Console.WriteLine($"Id: {user.UserId}");
    Console.WriteLine($"Total: {users.Count}");
    return HttpStatusCode.OK;
})
.WithName("CreateUser");

app.MapGet("/users/get", (string username) =>
{
    var result = collection.Find(u => u.Username == username).FirstOrDefault();
    return result;
})
.WithName("GetUser");

app.MapGet("/users/login", (string username, string password) => {
    var result = collection.Find(u => u.Username == username).FirstOrDefault();

    var validPassword = User.VerifyPassword(password, result.Password);
    if (validPassword) 
        return HttpStatusCode.OK;
    return HttpStatusCode.Unauthorized;
})
.WithName("LoginUser");

app.Run();