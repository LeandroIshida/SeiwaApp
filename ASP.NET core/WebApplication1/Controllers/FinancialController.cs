using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/financial")]
public class FinancialController : ControllerBase
{
    private readonly MockFinancialService _service;

    public FinancialController(MockFinancialService service)
    {
        _service = service;
    }

    [HttpGet("monthly-totals")]
    public IActionResult GetMonthlyTotals()
        => Ok(_service.GetMonthlyTotals());

    [HttpGet("productions")]
    public IActionResult GetProductions()
        => Ok(_service.GetProductions());

    [HttpGet("repayments")]
    public IActionResult GetRepayments()
        => Ok(_service.GetRepayments());
}
