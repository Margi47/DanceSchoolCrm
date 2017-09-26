using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using crm_webapi.Models;
using crm_webapi.Responses;
using crm_webapi.Repositories;
using AutoMapper;
using crm_webapi.Controllers.Users;
using crm_webapi.Controllers.Groups;
using Microsoft.Owin.Cors;
using Serilog;
using System.IO;
using crm_webapi.Middlewares;

namespace crm_webapi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;


    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      var connectionString = "Data Source=.\\SQLEXPRESS;Initial Catalog=Crm;Integrated Security=True;MultipleActiveResultSets=True";
      services.AddDbContext<CrmContext>(options =>
          options.UseSqlServer(connectionString));

      services.AddMvc(
          config =>
          {
            config.Filters.Add(typeof(HandleExceptionAttribute));
            config.Filters.Add(typeof(ApiValidationAttribute));
          });

      Log.Logger = new LoggerConfiguration()
      .MinimumLevel.Verbose()
       .WriteTo.Console()
       .WriteTo.RollingFile("log-{Date}.txt")
      .CreateLogger();

      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<IGroupRepository, GroupRepository>();
      services.AddScoped<ITeacherRepository, TeacherRepository>();
      services.AddScoped<IGroupUserRepository, GroupUserRepository>();
      services.AddScoped<IGroupTeacherRepository, GroupTeacherRepository>();
      services.AddCors();

      Mapper.Initialize(cfg =>
      {
        cfg.CreateMap<User, UserApiModel>();
        cfg.CreateMap<UserApiModel, User>();
        cfg.CreateMap<Group, GroupApiModel>();
        cfg.CreateMap<GroupApiModel, Group>();
        cfg.CreateMap<Teacher, TeacherApiModel>();
        cfg.CreateMap<TeacherApiModel, Teacher>();
        cfg.CreateMap<User, TeacherApiModel>();
        cfg.CreateMap<TeacherApiModel, User>();
        cfg.CreateMap<Teacher, TeacherApiModel>()
              .ForMember(x => x.Id, y => y.MapFrom(src => src.Id))
              .ForMember(x => x.Name, y => y.MapFrom(src => src.User.Name));
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseLogging();
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      app.UseMvc();
    }
  }
}
