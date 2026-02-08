package com.example.OnlineBankingWebsite.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.OnlineBankingWebsite.Entity.Transaction;
import com.example.OnlineBankingWebsite.Service.TransactionService;

@CrossOrigin
@RestController
@RequestMapping("/transaction")
public class TransactionController {
	
	@Autowired
	TransactionService tService;
	
	
	@PostMapping("/deposit/{id}")
	public ResponseEntity<String> deposit(@PathVariable int id, @RequestParam("amount") double amount){
		return tService.deposit(id,amount);
	}
	
	@PostMapping("/withdraw/{id}")
	public ResponseEntity<String> withdraw(@PathVariable int id, @RequestParam("amount") double amount){
		return tService.withdraw(id,amount);
	}
	
	@PostMapping("/transfer/{id}")
	public ResponseEntity<String> transfer(@PathVariable int id, @RequestParam("toUser") String toUser, @RequestParam("amount") double amount){
		return tService.transfer(id,toUser, amount);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Transaction>> allTransactions(){
		return tService.allTransactions();
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<List<Transaction>> getTransactionById(@PathVariable int id){
		return tService.getTransactionById(id);
	}
	
	@GetMapping("/recent")
	public ResponseEntity<List<Transaction>> getRecentTransactions() {
	    return tService.findTop10ByOrderByDateDesc();
	}

}
