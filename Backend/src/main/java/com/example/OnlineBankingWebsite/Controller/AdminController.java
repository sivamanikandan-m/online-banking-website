package com.example.OnlineBankingWebsite.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.OnlineBankingWebsite.Entity.Admin;
import com.example.OnlineBankingWebsite.Entity.AdminDashboardDto;
import com.example.OnlineBankingWebsite.Service.AdminService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminService aService;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerAdmin(@RequestBody Admin admin){
		return aService.registerAdmin(admin);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Admin> loginAdmin(@RequestBody Admin admin){
		return aService.loginAdmin(admin);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Admin>> allAdmins(){
		return aService.allAdmins();
	}
	
	@GetMapping("/getinfo")
	public ResponseEntity<AdminDashboardDto> getinfo(){
		return aService.getinfo();
	}
	
	
	@PutMapping("/updatestatus/{aId}")
	@CrossOrigin
	public ResponseEntity<String> updateAdminStatus(@PathVariable int aId, @RequestParam String aStatus){
		return aService.updateAdminStatus(aId, aStatus);
	}

}
