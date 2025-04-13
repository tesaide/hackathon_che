using System.Data;

namespace Services.Database.Helpers;

public static class DbReader
{
    public static Guid _GetGuid(this IDataReader r, string name) =>
        r.GetGuid(r.GetOrdinal(name));

    public static string _GetString(this IDataReader r, string name) =>
        r.GetString(r.GetOrdinal(name));

    public static bool _GetBool(this IDataReader r, string name) =>
        r.GetBoolean(r.GetOrdinal(name));

    public static byte[] _GetByteArray(this IDataReader r, string name) =>
        (byte[])r[name];

    public static DateTime _GetDateTime(this IDataReader r, string name) =>
        r.GetDateTime(r.GetOrdinal(name));

    public static DateTime? _GetNullableDateTime(this IDataReader r, string name) =>
        r.IsDBNull(r.GetOrdinal(name)) ? null : r.GetDateTime(r.GetOrdinal(name));
}