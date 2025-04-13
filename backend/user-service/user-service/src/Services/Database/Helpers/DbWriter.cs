namespace Services.Database.Helpers;

public static class DbWriter
{
    public static Dictionary<string, object?> FromObject(object src)
    {
        var dict = new Dictionary<string, object?>();
        foreach (var prop in src.GetType().GetProperties())
        {
            var val = prop.GetValue(src);
            dict[prop.Name] = val ?? DBNull.Value;
        }
        return dict;
    }
}
