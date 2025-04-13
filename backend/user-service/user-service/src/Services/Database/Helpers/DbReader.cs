using System;
using System.Data;

namespace Services.Database.Helpers;

public static class DbReader
{
    public static Guid _GetGuid(this IDataReader r, string name)
    {
        try
        {
            int i = r.GetOrdinal(name);
            return r.IsDBNull(i) ? Guid.Empty : r.GetGuid(i);
        }
        catch { return Guid.Empty; }
    }

    public static string _GetString(this IDataReader r, string name)
    {
        try
        {
            int i = r.GetOrdinal(name);
            return r.IsDBNull(i) ? string.Empty : r.GetString(i);
        }
        catch { return string.Empty; }
    }

    public static bool _GetBool(this IDataReader r, string name)
    {
        try
        {
            int i = r.GetOrdinal(name);
            return !r.IsDBNull(i) && r.GetBoolean(i);
        }
        catch { return false; }
    }

    public static byte[] _GetByteArray(this IDataReader r, string name)
    {
        try
        {
            object val = r[name];
            return val is byte[] data ? data : Array.Empty<byte>();
        }
        catch { return Array.Empty<byte>(); }
    }

    public static DateTime _GetDateTime(this IDataReader r, string name)
    {
        try
        {
            int i = r.GetOrdinal(name);
            return r.IsDBNull(i) ? DateTime.MinValue : r.GetDateTime(i);
        }
        catch { return DateTime.MinValue; }
    }

    public static DateTime? _GetNullableDateTime(this IDataReader r, string name)
    {
        try
        {
            int i = r.GetOrdinal(name);
            return r.IsDBNull(i) ? null : r.GetDateTime(i);
        }
        catch { return null; }
    }
}
