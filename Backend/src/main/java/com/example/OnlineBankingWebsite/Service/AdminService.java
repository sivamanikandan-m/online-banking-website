package com.example.OnlineBankingWebsite.Service;



import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.OnlineBankingWebsite.Entity.Admin;
import com.example.OnlineBankingWebsite.Entity.AdminDashboardDto;
import com.example.OnlineBankingWebsite.Entity.User;
import com.example.OnlineBankingWebsite.Repository.AdminRepo;
import com.example.OnlineBankingWebsite.Repository.TransactionRepo;
import com.example.OnlineBankingWebsite.Repository.UserRepo;

@Service
public class AdminService {
	
	@Autowired
	AdminRepo aRepo;
	
	@Autowired
	UserRepo uRepo;
	
	@Autowired
	TransactionRepo tRepo;

	public ResponseEntity<String> registerAdmin(Admin admin) {
		
		Admin a=aRepo.FindByName(admin.getaUsername());
		
		if(a==null) {
			
			if(admin.getaUsername()!=null && admin.getaPassword()!=null) {
				
				aRepo.save(admin);
				return ResponseEntity.status(HttpStatus.CREATED).body("Registraction Successful...!");
			}
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Username and Password mandatory...!");
		}
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Username Already Exists...!");
	}
	
	public ResponseEntity<Admin> loginAdmin(Admin admin) {
		Admin a = aRepo.FindByName(admin.getaUsername());

	    if (a != null) {
	        if (a.getaPassword().equals(admin.getaPassword())) {
	            return ResponseEntity.status(HttpStatus.OK).body(a);
	        }
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(null); 
	    }
	    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);
	}
	
	
	public ResponseEntity<java.util.List<Admin>> allAdmins() {
		
		java.util.List<Admin> admins=aRepo.findAll();
		
		if(admins.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(admins);
	}

	public ResponseEntity<AdminDashboardDto> getinfo() {
		
		AdminDashboardDto db = new AdminDashboardDto();

	    // Total users
	    db.users = (int) uRepo.count();

	    // Total transactions
	    db.transactions = (int) tRepo.count();

	    // Deposits today
	    db.depositsToday = tRepo.sumAmountByTypeAndDate("Deposit", LocalDate.now());

	    // Withdrawals today
	    db.withdrawalsToday = tRepo.sumAmountByTypeAndDate("Withdraw", LocalDate.now());

	    return ResponseEntity.status(HttpStatus.OK).body(db);
	}
	

	public ResponseEntity<String> updateAdminStatus(int aId, String aStatus) {
		
		Optional<Admin> a=aRepo.findById(aId);
		
		if(a.isPresent()) {
			Admin existadmin=a.get();
			
			existadmin.setaStatus(aStatus);
			aRepo.save(existadmin);
			
			return ResponseEntity.status(HttpStatus.OK).body("User status updated to "+aStatus);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User Found...!");
	}

	

	
	
	
}
