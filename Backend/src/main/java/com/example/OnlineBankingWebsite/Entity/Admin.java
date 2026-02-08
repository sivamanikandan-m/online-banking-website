package com.example.OnlineBankingWebsite.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int aId;
	private String aUsername;
	private String aPassword;
	private String aStatus="active";
	
	public Admin() {
		
	}
	
	

	public Admin(int aId, String aUsername, String aPassword, String aStatus) {
		super();
		this.aId = aId;
		this.aUsername = aUsername;
		this.aPassword = aPassword;
		this.aStatus = aStatus;
	}

	public int getaId() {
		return aId;
	}

	public void setaId(int aId) {
		this.aId = aId;
	}

	public String getaUsername() {
		return aUsername;
	}

	public void setaUsername(String aUsername) {
		this.aUsername = aUsername;
	}

	public String getaPassword() {
		return aPassword;
	}

	public void setaPassword(String aPassword) {
		this.aPassword = aPassword;
	}



	public String getaStatus() {
		return aStatus;
	}



	public void setaStatus(String aStatus) {
		this.aStatus = aStatus;
	}
	
	
	
}
