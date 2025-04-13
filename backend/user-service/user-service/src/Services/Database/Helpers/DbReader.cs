using System.Data;

namespace Services.Database.Helpers;

public static class DbReader
{
    public static Guid GetGuid(this IDataReader r, string name) =>
        r.GetGuid(r.GetOrdinal(name));

    public static string GetString(this IDataReader r, string name) =>
        r.GetString(r.GetOrdinal(name));

    public static bool GetBool(this IDataReader r, string name) =>
        r.GetBoolean(r.GetOrdinal(name));

    public static byte[] GetByteArray(this IDataReader r, string name) =>
        (byte[])r[name];

    public static DateTime GetDateTime(this IDataReader r, string name) =>
        r.GetDateTime(r.GetOrdinal(name));

    public static DateTime? GetNullableDateTime(this IDataReader r, string name) =>
        r.IsDBNull(r.GetOrdinal(name)) ? null : r.GetDateTime(r.GetOrdinal(name));
}