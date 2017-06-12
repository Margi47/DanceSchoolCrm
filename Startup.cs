using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using angular.Models;
using AutoMapper;
using angular.Controllers.Users;
using angular.Controllers.Groups;
using angular.Repositories;
using angular.Responses;

namespace angular
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = "Data Source=.\\SQLEXPRESS;Initial Catalog=Crm;Integrated Security=True;MultipleActiveResultSets=True";
            services.AddDbContext<CrmContext>(options =>
                options.UseSqlServer(connectionString));
            // Add framework services.
            services.AddMvc(
                config =>
                {
                    config.Filters.Add(typeof(HandleExceptionAttribute));
                    config.Filters.Add(typeof(ApiValidationAttribute));
                }
            );
            
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<ITeacherRepository, TeacherRepository>();
            services.AddScoped<IGroupUserRepository, GroupUserRepository>();
            services.AddScoped<IGroupTeacherRepository, GroupTeacherRepository>();

            Mapper.Initialize(cfg => {
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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
