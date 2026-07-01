namespace Gomoku.Data.DataAccess;

using Gomoku.Data.Models;

public class SettingDataAccess(GomokuDbContext database)
{
    private readonly GomokuDbContext database = database;

    /// <summary>
    /// Gets a setting for a specific user by name, or null if it is not set.
    /// </summary>
    public Setting? GetUserSetting(int userId, string name)
    {
        return database.Settings.FirstOrDefault(s => s.UserId == userId && s.Name == name);
    }

    /// <summary>
    /// Creates or updates a user's setting value. The (UserId, Name) pair is unique,
    /// so an existing row is updated in place rather than duplicated.
    /// </summary>
    public void UpsertUserSetting(int userId, string name, string? value, TypeCode valueType)
    {
        var existing = database.Settings.FirstOrDefault(s => s.UserId == userId && s.Name == name);
        if (existing == null)
        {
            database.Settings.Add(new Setting
            {
                UserId = userId,
                Name = name,
                Value = value,
                ValueType = (int)valueType,
            });
        }
        else
        {
            existing.Value = value;
            existing.ValueType = (int)valueType;
        }

        database.SaveChanges();
    }
}
