using System.Data;

namespace Services.Database;

public interface IDbService
{
    T? QuerySingle<T>(string sql, Func<IDataReader, T> map, object? parameters = null);
  
    IEnumerable<T> Query<T>(string sql, Func<IDataReader, T> map, object? parameters = null);
  
    int Execute(string sql, object? parameters = null);
}
