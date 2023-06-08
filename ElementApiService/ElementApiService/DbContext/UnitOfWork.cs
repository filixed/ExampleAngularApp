namespace ElementApiService.DbContext;

using Model;

public interface IUnitOfWork
{
    ElementRepository ElementRepository { get; }
    void Save();
}

public class UnitOfWork : IDisposable, IUnitOfWork
{
    private ElementContext context;
    private ElementRepository elementRepository;
    
    public UnitOfWork(ElementContext context)
    {
        this.context = context;
    }
    
    public ElementRepository ElementRepository
    {
        get
        {
            elementRepository = new ElementRepository(context);
            return elementRepository;
        }
    }

    public void Save()
    {
        context.SaveChanges();
    }

    private bool disposed = false;

    

    protected virtual void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                context.Dispose();
            }
        }
        this.disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
