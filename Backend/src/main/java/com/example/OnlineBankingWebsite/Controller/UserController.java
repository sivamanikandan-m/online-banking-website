package com.example.OnlineBankingWebsite.Controller;

import java.util.List;
import java.util.Optional;

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
import com.example.OnlineBankingWebsite.Entity.User;
import com.example.OnlineBankingWebsite.Service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
	
	//Data -> parameter / body / path(user/2)
	
	@Autowired
	UserService uService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user){
		
		return uService.register(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam("userName") String user, @RequestParam("password") String pass){
		
		return uService.userlogin(user,pass);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<User>> allUsers(){
		return uService.allUsers();
	}
	
	@GetMapping("/getuser/{id}")
	public ResponseEntity<Optional<User>> getUser(@PathVariable int id){
		return uService.getUser(id);
	}
	
	@PutMapping("/updatestatus/{id}")
	public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestParam String status){
		return uService.updateStatus(id, status);
	}
	


}
