using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;

namespace crm_webapi
{
  public class Program
  {
    public static int Main(string[] args)
    {
      Log.Logger = new LoggerConfiguration()
          .MinimumLevel.Information()
          .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
          .MinimumLevel.Override("System", LogEventLevel.Warning)
          .MinimumLevel.Override("Microsoft.AspNetCore.Hosting.Internal.WebHost", LogEventLevel.Information)
          .WriteTo.Console()
          .WriteTo.RollingFile("Logs/log-{Date}.txt")
          .CreateLogger();

      try
      {
        Log.Information("Getting the motors running...");

        WebHost.CreateDefaultBuilder(args)
                      .UseStartup<Startup>()
                      .UseSerilog()
                      .Build().Run();

        return 0;
      }
      catch (Exception ex)
      {
        Log.Fatal(ex, "Host terminated unexpectedly");
        return 1;
      }
      finally
      {
        Log.CloseAndFlush();
      }
    }
  }
}
