using StratmanMedia.Enumerations;

namespace OmniBudget.Core.Shared.Enumerations
{
    public class TimePeriodEnum : Enumeration
    {
        public static readonly TimePeriodEnum Days = new TimePeriodEnum(0, "Days");
        public static readonly TimePeriodEnum Weeks = new TimePeriodEnum(1, "Weeks");
        public static readonly TimePeriodEnum Months = new TimePeriodEnum(2, "Months");
        public static readonly TimePeriodEnum Years = new TimePeriodEnum(3, "Years");

        private TimePeriodEnum(int value, string displayName) : base(value, displayName) { }
    }
}