package com.vw.fakultaet73.VerordnungenBackend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.vw.fakultaet73.VerordnungenBackend.persistance.DecreeEntity;
import com.vw.fakultaet73.VerordnungenBackend.persistance.repositories.DecreeRepository;

@Service
@EnableScheduling
public class DecreeService {

	@Autowired
	private DecreeRepository decreeRepository;

	private List<DecreeEntity> decreeList = new ArrayList<>();

	@Scheduled(fixedRate = 1000)
	public void loadDecreeList() {
		System.out.println("REEEELOAAAAADDDD");
		Iterable<DecreeEntity> savedEntitys = this.decreeRepository.findAll();	
		savedEntitys.forEach(savedEntity -> this.decreeList.add(savedEntity));
	}

	public List<DecreeEntity> getDecreesList(){
		return this.decreeList;
	}
}
