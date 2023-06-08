namespace ElementApiService.DbContext;

using System.Linq.Expressions;

public interface IBaseRepository<T> where T : class
{
    public IEnumerable<T> Get(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        string includeProperties = "");

    public T? GetById(object id);
    public void Insert(T entity);
    public void Delete(object id);
    public void Delete(T entityToDelete);
    public void Update(T entityToUpdate);
}