package com.example.OnlineBankingWebsite.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.OnlineBankingWebsite.Entity.User;
import com.example.OnlineBankingWebsite.Repository.TransactionRepo;
import com.example.OnlineBankingWebsite.Repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo uRepo;
	
	@Autowired
	TransactionRepo tRepo;

	public ResponseEntity<String> register(User user) {
		
		User u=uRepo.FindByName(user.getUserName());
		
		if(u==null) {
			if(user.getUserName()!=null && user.getPassword()!=null) {
				uRepo.save(user);
				return ResponseEntity.status(HttpStatus.ACCEPTED).body("Registration Successfull...!");
			}
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Username and Password mandatory...!");
		}
		return ResponseEntity.status(HttpStatus.CONFLICT).body("User name already exist...");
	}

	public ResponseEntity<?> userlogin(String user, String pass) {
		
		User u=uRepo.FindByName(user);
		
		if(u!=null) {
			if(u.getPassword().equals(pass)){
				
				if(!u.getStatus().equals("inactive")) {

				return ResponseEntity.status(HttpStatus.OK).body(u);
			}
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Your account is inactive. Please contact admin.");
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	}

	public ResponseEntity<List<User>> allUsers() {
		
		List<User> users=uRepo.findAll();
		
		if(users==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}

	public ResponseEntity<Optional<User>> getUser(int id) {
		
		Optional<User> u=uRepo.findById(id);
		
		if(u.isPresent()) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(u);
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	public ResponseEntity<String> updateStatus(int id, String status) {
		
		Optional<User> u=uRepo.findById(id);
		
		if(u.isPresent()) {
			User existuser=u.get();
			
			existuser.setStatus(status);
			uRepo.save(existuser);
			
			return ResponseEntity.status(HttpStatus.OK).body("User status updated to "+status);
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User Found...!");
	}

	

}
