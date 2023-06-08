namespace ElementApiService.DbContext;

using System.Linq.Expressions;
using Model;

public interface IElementRepository : IBaseRepository<ElementEntity>
{

}

public class ElementRepository : BaseRepository<ElementEntity>, IElementRepository
{
    public ElementRepository(ElementContext context) : base(context)
    {
    }
    
}