using Microsoft.AspNetCore.Mvc;

namespace ElementApiService.Controllers;

using DbContext;
using Dto;
using Model;

[ApiController]
[Route("[controller]")]
public class ElementController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public ElementController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet(Name = "GetElements")]
    public IEnumerable<ElementEntity> Get()
    {
        var result = _unitOfWork.ElementRepository.Get();
        return result;
    }
    
    [HttpPost(Name = "CreateElement")]
    public ActionResult<int> Post(CreateElementCommand request)
    {
        var entity = new ElementEntity
        {
            AtomicNumber = request.AtomicNumber,
            Name = request.Name,
            Weight = request.Weight,
            Symbol = request.Symbol,
            ImgHref = request.ImgHref,
        };
        _unitOfWork.ElementRepository.Insert(entity);
        _unitOfWork.Save();
        
        return entity.Id;
    }
    
    [HttpPut]
    public ActionResult<int> Put(UpdateElementCommand request)
    {
        var entity = _unitOfWork.ElementRepository.GetById(request.Id);

        if (entity is null)
        {
            return NotFound("not found");
        }

        entity.Name = request.Name;
        entity.Weight = request.Weight;
        entity.AtomicNumber = request.AtomicNumber;
        entity.Symbol = request.Symbol;
        entity.ImgHref = request.ImgHref;

        _unitOfWork.ElementRepository.Update(entity);
        _unitOfWork.Save();
        
        return request.Id;
    }
    
    [HttpGet]
    [Route("single/{id:int}")]
    public ActionResult<ElementEntity?> GetOne(int id)
    {
        
        var result = _unitOfWork.ElementRepository.GetById(id);
        
        return result;
    }
    
    [HttpDelete(Name = "DeleteElement")]
    public ActionResult<int> Delete(DeleteElementCommand request)
    {
        var entity = _unitOfWork.ElementRepository.GetById(request.Id);
        if (entity is null)
        {
            return BadRequest("Element doesnt exist");
        }
        
        _unitOfWork.ElementRepository.Delete(entity);
        _unitOfWork.Save();
        
        return entity.Id;
    }
}