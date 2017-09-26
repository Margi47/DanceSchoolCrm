using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Middlewares
{
  public static class MiddlewareExtensions
  {
    public static IApplicationBuilder UseLogging(this IApplicationBuilder builder)
    {
      return builder.UseMiddleware<LoggingMiddleware>();
    }
  }
}
