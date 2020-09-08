package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites.DecreeEntity;
import com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.repositories.DecreeEntityRepository;

@Service
public class ImportService {
	
	@Autowired
	private DecreeEntityRepository decreeRepository;
	
	public void saveDecrees(List<DecreeEntity> decrees) {
		this.decreeRepository.saveAll(decrees);
	}
}