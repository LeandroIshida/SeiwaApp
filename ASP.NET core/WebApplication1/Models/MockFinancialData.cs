public class MockFinancialData
{
    public MonthlyTotals MonthlyTotals { get; set; } = new();
    public List<Production> Productions { get; set; } = new();
    public List<Repayment> Repayments { get; set; } = new();
}

public class MonthlyTotals
{
    public int Year { get; set; }
    public List<MonthlyValue> Produced { get; set; } = new();
    public List<MonthlyValue> Repaid { get; set; } = new();
}

public class MonthlyValue
{
    public int Month { get; set; }
    public decimal Total { get; set; }
}

public class Production
{
    public string Id { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Hospital { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class Repayment : Production { }
