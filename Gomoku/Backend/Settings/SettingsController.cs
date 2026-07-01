using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Gomoku.Backend.Settings.Models;
using Gomoku.Data.DataAccess;
using Gomoku.Data.Models;

namespace Gomoku.Backend.Settings;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SettingsController(SettingDataAccess settingDataAccess, UserDataAccess userDataAccess) : ControllerBase
{
    // Setting name for the user's selected UI theme. The valid set of themes lives
    // in the frontend registry; the backend stores whatever string it is given and
    // the client validates it against the registry on read.
    private const string ThemeSettingName = "Theme";

    private readonly SettingDataAccess settingDataAccess = settingDataAccess;
    private readonly UserDataAccess userDataAccess = userDataAccess;

    /// <summary>
    /// Returns the current user's saved theme, or null if none is stored.
    /// </summary>
    [HttpGet("theme")]
    public IActionResult GetTheme()
    {
        var user = GetCurrentUser();
        if (user == null)
        {
            return Unauthorized();
        }

        var setting = settingDataAccess.GetUserSetting(user.Id, ThemeSettingName);
        return Ok(new { theme = setting?.Value });
    }

    /// <summary>
    /// Saves the current user's theme selection.
    /// </summary>
    [HttpPut("theme")]
    public IActionResult SetTheme([FromBody] ThemeUpdateModel request)
    {
        var user = GetCurrentUser();
        if (user == null)
        {
            return Unauthorized();
        }

        if (string.IsNullOrWhiteSpace(request?.Theme))
        {
            return BadRequest("Theme cannot be empty");
        }

        settingDataAccess.UpsertUserSetting(user.Id, ThemeSettingName, request.Theme, TypeCode.String);
        return Ok(new { theme = request.Theme });
    }

    private User? GetCurrentUser()
    {
        var username = User?.Identity?.Name;
        return username == null ? null : userDataAccess.GetUser(username);
    }
}
