using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureServices(services =>
                    {
                        services.AddSingleton<JsonService>();  
                        services.AddControllers();  

                        services.AddCors(options =>
                        {
                            options.AddPolicy("AllowAll", builder =>
                            {
                                builder.AllowAnyOrigin()    
                                       .AllowAnyMethod()    
                                       .AllowAnyHeader();   
                            });
                        });

                        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                            .AddJwtBearer(options =>
                            {
                                options.TokenValidationParameters = new TokenValidationParameters
                                {
                                    ValidateIssuer = true,
                                    ValidateAudience = true,
                                    ValidateLifetime = true,
                                    ValidateIssuerSigningKey = true,
                                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key")),  
                                    ValidIssuer = "your_issuer",  
                                    ValidAudience = "your_audience" 
                                };
                            });
                    })
                    .Configure((context, app) =>  
                    {
                        var env = context.HostingEnvironment;  

                        if (env.IsDevelopment())  
                        {
                            app.UseDeveloperExceptionPage();  
                        }

                        app.UseCors("AllowAll");  
                        app.UseAuthentication();  
                        app.UseAuthorization();   

                        app.UseRouting();  

                        app.UseEndpoints(endpoints =>
                        {
                            endpoints.MapControllers();
                        });
                    });
                });
    }
}
