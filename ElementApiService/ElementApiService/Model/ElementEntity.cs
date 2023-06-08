namespace ElementApiService.Model;

public class ElementEntity
{
    public int Id { get; set; }
    public int AtomicNumber { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Weight { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string ImgHref { get; set; } = string.Empty;
}