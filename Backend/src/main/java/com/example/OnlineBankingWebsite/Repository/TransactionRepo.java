package com.example.OnlineBankingWebsite.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.OnlineBankingWebsite.Entity.Transaction;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer>{

	@Query("select u from Transaction u where u.userName=?1")
	List<Transaction> FindByName(String userName);



	@Query("SELECT COALESCE(SUM(t.amount),0) FROM Transaction t WHERE t.tType = :tType AND DATE(t.date) = :date")
	double sumAmountByTypeAndDate(@Param("tType") String tType, @Param("date") LocalDate date);

	
	List<Transaction> findTop10ByOrderByDateDesc();
	

}
