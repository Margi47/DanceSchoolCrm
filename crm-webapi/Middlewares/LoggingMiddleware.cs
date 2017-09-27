using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.IO;
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
        var originalRequestBody = context.Request.Body;
        var requestBodyStream = new MemoryStream();
        context.Request.Body = requestBodyStream;
        _logger.Verbose( await GetRequestMessage(context, requestBodyStream));
        await context.Request.Body.CopyToAsync(requestBodyStream);        
        
        var originalResponseBody = context.Response.Body;
        var responseBodyStream = new MemoryStream();
        context.Response.Body = responseBodyStream;

        await _next.Invoke(context);
        _logger.Verbose(await GetResponseMessage(responseBodyStream));    
        await responseBodyStream.CopyToAsync(originalResponseBody);
        
        context.Request.Body = originalRequestBody;
        context.Response.Body = originalResponseBody;
      }
    }

    private async Task<string> GetRequestMessage(HttpContext context, MemoryStream requestBodyStream)
    {
      requestBodyStream.Seek(0, SeekOrigin.Begin);

      var url = UriHelper.GetDisplayUrl(context.Request);
      var requestBodyText = await new StreamReader(requestBodyStream).ReadToEndAsync();
      requestBodyStream.Seek(0, SeekOrigin.Begin);

      return $"REQUEST METHOD: {context.Request.Method}, REQUEST BODY: {requestBodyText}, REQUEST URL: {url}";
    }

    private async Task<string> GetResponseMessage(MemoryStream responseBodyStream)
    {
      responseBodyStream.Seek(0, SeekOrigin.Begin);
      var responseBody = await new StreamReader(responseBodyStream).ReadToEndAsync();
      responseBodyStream.Seek(0, SeekOrigin.Begin);

      return $"RESPONSE LOG: {responseBody}";
    }
  }
}
