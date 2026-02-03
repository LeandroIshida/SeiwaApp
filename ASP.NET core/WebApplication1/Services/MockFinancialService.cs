using System.Text.Json;
using System.IO;
using Microsoft.AspNetCore.Hosting;

public class MockFinancialService
{
    private readonly MockFinancialData _data;

    public MockFinancialService(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "Data", "mockFinancialData.json");

        if (!File.Exists(path))
            throw new FileNotFoundException("Mock financial data file not found.", path);

        var json = File.ReadAllText(path);

        _data = JsonSerializer.Deserialize<MockFinancialData>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        ) ?? new MockFinancialData();
    }

    public MonthlyTotals GetMonthlyTotals() => _data.MonthlyTotals;
    public List<Production> GetProductions() => _data.Productions;
    public List<Repayment> GetRepayments() => _data.Repayments;
}
