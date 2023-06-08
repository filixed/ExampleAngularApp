namespace ElementApiService.DbContext;

using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    private readonly ElementContext context;
    private readonly DbSet<T> dbSet;

    public BaseRepository(ElementContext context)
    {
        this.context = context;
        this.dbSet = context.Set<T>();
    }
    
    public virtual IEnumerable<T> Get(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        string includeProperties = "")
    {
        IQueryable<T> query = dbSet;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        query = includeProperties.Split(new char[]
                {
                    ','
                },
                StringSplitOptions.RemoveEmptyEntries)
            .Aggregate(query,
                (current,
                    includeProperty) => current.Include(includeProperty));

        return orderBy != null ? orderBy(query).ToList() : query.ToList();
    }
    
    public virtual T? GetById(object id)
    {
        return dbSet.Find(id);
    }

    public virtual void Insert(T entity)
    {
        var newEntity  = dbSet.Add(entity);
        var kupa = 1;
    }

    public virtual void Delete(object id)
    {
        var entityToDelete = dbSet.Find(id);
        if (entityToDelete != null) Delete(entityToDelete);
    }

    public virtual void Delete(T entityToDelete)
    {
        if (context.Entry(entityToDelete).State == EntityState.Detached)
        {
            dbSet.Attach(entityToDelete);
        }
        dbSet.Remove(entityToDelete);
    }

    public virtual void Update(T entityToUpdate)
    {
        dbSet.Update(entityToUpdate);
    }
}