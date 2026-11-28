
using System;
using System.ComponentModel.DataAnnotations;

namespace _31241026863_HoangThiMyDung.Validation;

public class CheckDateGreaterThanTodayAttribute : ValidationAttribute
{
protected override ValidationResult IsValid(object value, ValidationContext
validationContext)
{
DateTime dt = (DateTime)value;
if (dt >= DateTime.UtcNow)
{
return ValidationResult.Success;
}
return new ValidationResult(ErrorMessage ?? "Dữ liệu ngày phải lớn hơn ngày hôm  nay");
}
}
    