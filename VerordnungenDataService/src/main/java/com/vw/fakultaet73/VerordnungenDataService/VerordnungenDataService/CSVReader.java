package com.vw.fakultaet73.VerordnungenDataService.VerordnungenDataService;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CSVReader {

	private String csvFileWindows = "C:/Users/VW3Q1D5/Desktop/Verordnungen.csv";
	private String csvFileLinux = "~/media/sf_Test/Kassandra";

	public List<String[]> readFromCSV(){
		BufferedReader br = null;
		String line = "";
		String csvSplitBy = ",";
		List<String[]> decreeList = new ArrayList<>();

		try {
			br = new BufferedReader(new FileReader(this.csvFileWindows));
			while((line = br.readLine()) != null) {
				String[] decree = line.split(csvSplitBy);
				decreeList.add(decree);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		if(decreeList.size() == 0) {
			try {
				br = new BufferedReader(new FileReader(this.csvFileLinux));
				while((line = br.readLine()) != null) {
					String[] decree = line.split(csvSplitBy);
					decreeList.add(decree);
				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return decreeList;
	}
}
	
	
	   

