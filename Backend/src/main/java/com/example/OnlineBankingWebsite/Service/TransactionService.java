package com.example.OnlineBankingWebsite.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.OnlineBankingWebsite.Entity.Transaction;
import com.example.OnlineBankingWebsite.Entity.User;
import com.example.OnlineBankingWebsite.Repository.TransactionRepo;
import com.example.OnlineBankingWebsite.Repository.UserRepo;

@Service
public class TransactionService {
	
	@Autowired
	TransactionRepo tRepo;
	
	@Autowired
	UserRepo uRepo;

	public ResponseEntity<String> deposit(int id, double amount) {
		
		Optional<User> user=uRepo.findById(id);
		
		if(user.isPresent()) {
			
			User u=user.get();
			
			if("active".equalsIgnoreCase(u.getStatus())) {
				
				if(amount >0) {
					
					double newBalance = u.getBalance() + amount;
			        u.setBalance(newBalance);
			        uRepo.save(u);
			        
			        Transaction transaction = new Transaction();
			        transaction.settType("Deposit");
			        transaction.setAmount(amount);
			        transaction.setUserName(u.getUserName());
			        transaction.setDate(LocalDateTime.now());
			        tRepo.save(transaction);
			        
			        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Your Amount Deposited Successful..!");
				}
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("The Deposit Amount Should be more than 0...!");
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your Account is Inactive...!");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found...!");
	}

	
	public ResponseEntity<String> withdraw(int id, double amount) {
		
		Optional<User> user=uRepo.findById(id);
		
		if(user.isPresent()) {
			
			User u=user.get();
			
			if("active".equalsIgnoreCase(u.getStatus())) {
				
				if(amount < u.getBalance()) {
					
					double newBalance = u.getBalance() - amount;
			        u.setBalance(newBalance);
			        uRepo.save(u);
			        
			        Transaction transaction = new Transaction();
			        transaction.settType("Withdraw");
			        transaction.setAmount(amount);
			        transaction.setUserName(u.getUserName());
			        transaction.setDate(LocalDateTime.now());
			        tRepo.save(transaction);
			        
			        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Amount Withdrawed Successfully..!");
				}
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Insufficient Balance for Withdrawal...!");
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your Account is Inactive...!");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found...!");
	}


	public ResponseEntity<String> transfer(int id, String toUser, double amount) {
		
		Optional<User> user=uRepo.findById(id);
		
		User touser=uRepo.FindByName(toUser);
		
		if(user.isPresent()) {
		   
			User u=user.get();
			
			if("active".equalsIgnoreCase(u.getStatus())) {
				
				if(touser!=null) {
					
					if("active".equalsIgnoreCase(touser.getStatus())) {
						
						if(amount>0) {
							
							if(amount<=u.getBalance()) {
								
								u.setBalance(u.getBalance()-amount);
								uRepo.save(u);
								
								touser.setBalance(touser.getBalance()+amount);
								uRepo.save(touser);
								
						        Transaction senderTxn = new Transaction();
						        senderTxn.settType("Transfer Sent");
						        senderTxn.setAmount(amount);
						        senderTxn.setUserName(u.getUserName());
						        senderTxn.setDate(LocalDateTime.now());
						        tRepo.save(senderTxn);

						        Transaction receiverTxn = new Transaction();
						        receiverTxn.settType("Transfer Received");
						        receiverTxn.setAmount(amount);
						        receiverTxn.setUserName(touser.getUserName());
						        receiverTxn.setDate(LocalDateTime.now());
						        tRepo.save(receiverTxn);
						        
								return ResponseEntity.status(HttpStatus.ACCEPTED).body("Transaction Successful...!");
							}
							return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Insufficient Balance for Transfer...!");
						}
						return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("The Deposit Amount Should be Greater than 0...!");
					}
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Receiver Account is Inactive...!");
				}
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Receiver Username not Found...!");
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your Account is Inactive...!");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found...!");
	}


	public ResponseEntity<List<Transaction>> allTransactions() {
		
		List<Transaction> transactions=tRepo.findAll();
		
		if(transactions==null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(transactions);
	}


	public ResponseEntity<List<Transaction>> getTransactionById(int id) {
		
		Optional<User> user=uRepo.findById(id);
		
		if(user.isPresent()) {
			
			User u=user.get();
			
			List<Transaction> transactions=tRepo.FindByName(u.getUserName());
			
			return ResponseEntity.status(HttpStatus.OK).body(transactions);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}


	public ResponseEntity<List<Transaction>> findTop10ByOrderByDateDesc() {
		
		List<Transaction> latestTransactions = tRepo.findTop10ByOrderByDateDesc();
		
		return ResponseEntity.status(HttpStatus.OK).body(latestTransactions);
	}

	


	

	
	
	
	
	

}
