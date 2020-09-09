package com.vw.fakultaet73.VerordnungenDataService.VerordnungenDataService;

import lombok.Data;

/**
 * Decree
 */
@Data
public class Decree {

    private Long id;
    private String state;
    private String description;
    private String regulations;

    public Decree(String state, String description, String regulation){
        this.state = state;
        this.description = description;
        this.regulations = regulation;
    }
}