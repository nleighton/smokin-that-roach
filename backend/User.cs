using System.Security.Cryptography;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

class User 
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public Guid UserId { get; set; }

    public User(string username, string password, Guid userid)
    {
        Username = username;
        Password = password;
        UserId = userid;
    }

    public static string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(16);

        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32);

        byte[] hashBytes = new byte[48];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 32);

        return Convert.ToBase64String(hashBytes);
    }

    public static bool VerifyPassword(string enteredPassword, string storedPassword)
    {
        // Decode the stored Base64 string
        byte[] hashBytes = Convert.FromBase64String(storedPassword);

        // Extract the salt (first 16 bytes)
        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        // Compute the hash for the entered password
        var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 10000, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32); // 256-bit hash

        // Compare the stored hash with the computed hash
        for (int i = 0; i < 32; i++)
        {
            if (hashBytes[i + 16] != hash[i])
            {
                return false; // Mismatch
            }
        }
        return true; // Match
    }
}