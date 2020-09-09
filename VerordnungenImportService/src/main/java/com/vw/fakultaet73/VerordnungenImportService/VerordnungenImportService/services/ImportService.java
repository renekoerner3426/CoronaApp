package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites.DecreeEntity;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.repositories.DecreeEntityRepository;

@Service
public class ImportService {
	
	@Autowired
	private DecreeEntityRepository decreeRepository;
	
	public List<DecreeEntity> saveDecrees(List<DecreeEntity> decrees) {
		Iterable<DecreeEntity> savedEntitys = this.decreeRepository.saveAll(decrees);
		
		List<DecreeEntity> decreeList = new ArrayList<>();
		savedEntitys.forEach(savedEntity -> decreeList.add(savedEntity));
		return decreeList;
	}
	
	public DecreeEntity save(DecreeEntity decrees) {
		return this.decreeRepository.save(decrees);
	}
}