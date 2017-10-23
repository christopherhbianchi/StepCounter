package data;

import java.util.List;

import entities.StepDay;

public interface StepDayDAO {

	
//	CRUD functionality
//	2 Reads
//	any names we want
//
	
//	Reads
	public List<StepDay> getAll();
	public StepDay getStepDayByID(int id);
	
	public StepDay createStepDay(String stepDayJSON);
	public StepDay updateStepDay(String stepDayJSON, int id);
	public boolean deleteStepDay(int id);
	
	
}
