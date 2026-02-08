package com.example.OnlineBankingWebsite.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.OnlineBankingWebsite.Entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{

	@Query("select u from User u where u.userName=?1")
	User FindByName(String userName);

}
