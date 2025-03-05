using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Configuration;
// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using Microsoft.IdentityModel.Tokens;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly ITokenService _tokenService;
	private readonly IConfiguration _configuration;

	public AuthController(IConfiguration configuration, ITokenService tokenService)
	{
		_configuration = configuration;
		_tokenService = tokenService;
	}

	[HttpPost("login")]
	public IActionResult Login([FromBody] User user)
	{
		if (user.Username == "admin" && user.Password == "password")
		{
			var token = _tokenService.GenerateJwtToken(user.Username);
			return Ok(new { token });
		}

		return Unauthorized();
	}

	// private string GenerateJwtToken(string username)
	// {
	// 	var claims = new[]
	// 	{
	// 		new Claim(ClaimTypes.Name, username)
	// 	};

	// 	var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
	// 	var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
	// 	var token = new JwtSecurityToken(
	// 		issuer: _configuration["Jwt:Issuer"],
	// 		audience: _configuration["Jwt:Audience"],
	// 		claims: claims,
	// 		expires: DateTime.Now.AddHours(1),
	// 		signingCredentials: creds
	// 	);

	// 	return new JwtSecurityTokenHandler().WriteToken(token);
	// }
}
