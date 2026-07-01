using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gomoku.Data.Models;

public class Setting
{
    public int Id { get; init; }

    [ForeignKey(nameof(User))]
    public int? UserId { get; init; }      // NULL = application-wide
    public User? User { get; init; }

    [MaxLength(100)]
    public required string Name { get; init; }

    public string? Value { get; set; }

    public int ValueType { get; set; }      // System.TypeCode
}