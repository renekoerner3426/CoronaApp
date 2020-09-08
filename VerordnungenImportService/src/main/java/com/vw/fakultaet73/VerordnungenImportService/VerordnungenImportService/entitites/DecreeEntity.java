package com.vw.fakultaet73.VerordnungenImportService.VerordnungenImportService.entitites;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * RegulationEntity
 */
@Entity
@Data
@NoArgsConstructor
public class DecreeEntity {
	 @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column
	    private Long id;

	    @Column
	    private String state;
	    @Column
	    private String description;
	    @Column
	    private String regulations;

	    public DecreeEntity(Long id, String state, String description, String regulation){
	    	this.id = id;
	        this.state = state;
	        this.description = description;
	        this.regulations = regulation;
	    }
}
