package com.vw.fakultaet73.VerordnungenDataService.VerordnungenDataService;


import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Decree
 */
@Data
@NoArgsConstructor
public class DecreeEntity {


    private Long id = 0L;
    private String state;
    private String description;
    private String regulations;

    public DecreeEntity(String state, String description, String regulation){
        this.state = state;
        this.description = description;
        this.regulations = regulation;
    }
}