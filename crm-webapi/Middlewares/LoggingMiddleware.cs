using Microsoft.AspNetCore.Http;
using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Middlewares
{
  public class LoggingMiddleware
  {
    private readonly ILogger _logger;
    private readonly RequestDelegate _next;

    public LoggingMiddleware(RequestDelegate next)
    {
      _next = next;
      _logger = Log.ForContext(GetType());
    }

    public async Task Invoke(HttpContext context)
    {
      if (_logger.IsEnabled(LogEventLevel.Verbose))
      {
        _logger.Verbose("Sending request {HttpRequest}", context.Request.Path);
      }

      await _next.Invoke(context);

      _logger.Verbose("Receiving response {HttpResponse}", context.Response.Body.ToString());
    }
  }
}
