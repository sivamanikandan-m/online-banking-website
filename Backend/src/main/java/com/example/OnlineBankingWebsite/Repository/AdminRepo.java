package com.example.OnlineBankingWebsite.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.OnlineBankingWebsite.Entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer>{
	
	@Query("select a from Admin a where a.aUsername=?1")
	Admin FindByName(String getaUsername);

}
