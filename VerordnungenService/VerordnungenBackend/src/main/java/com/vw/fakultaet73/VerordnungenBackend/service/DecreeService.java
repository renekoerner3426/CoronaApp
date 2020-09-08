package com.vw.fakultaet73.VerordnungenBackend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vw.fakultaet73.VerordnungenBackend.persistance.DecreeEntity;
import com.vw.fakultaet73.VerordnungenBackend.persistance.repositories.DecreeRepository;

@Service
public class DecreeService {

	@Autowired
	private DecreeRepository decreeRepository;

	public List<DecreeEntity> getDecreeList() {
		Iterable<DecreeEntity> savedEntitys = this.decreeRepository.findAll();
		
		List<DecreeEntity> decreeList = new ArrayList<>();
		savedEntitys.forEach(savedEntity -> decreeList.add(savedEntity));
		return decreeList;
	}
}
