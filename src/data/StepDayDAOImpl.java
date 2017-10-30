package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.StepDay;

@Repository
@Transactional //when we enter a method, transaction is auto opened and closed
public class StepDayDAOImpl implements StepDayDAO {
	
	
	@PersistenceContext //creates an EntityManager for us (Insted of the steps of building it all by hand)
	private EntityManager em; 
	
	@Override
	public List<StepDay> getAll() {
		String query = "SELECT s FROM StepDay s";
		List<StepDay> stepDayList = em.createQuery(query, StepDay.class)
				.getResultList();
		
		return stepDayList;
	}

	@Override
	public StepDay getStepDayByID(int id) {
		
		return em.find(StepDay.class, id);
	}

	@Override
	public StepDay createStepDay(String stepDayJSON) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			StepDay sd = mapper.readValue(stepDayJSON, StepDay.class);
			System.out.println(stepDayJSON);

			//if there's a duplicate date, delete the old one
			List<StepDay> stepDayList = getAll();
			for(StepDay s : stepDayList) {
				
				if(s.getDateStepped().equals(sd.getDateStepped())) {
					s.setSteps(s.getSteps() + sd.getSteps());
					return null; //and then just return null
//					deleteStepDay(s.getId()); //if theres a duplicate date, delete the old date
				}
			}
			em.persist(sd); //persisting it to the database places it, and now auto generates an id for it
			em.flush();
			
			return sd;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	

	@Override
	public StepDay updateStepDay(String stepDayJSON, int id) {
		
		StepDay sd = em.find(StepDay.class, id);
		
		ObjectMapper mapper = new ObjectMapper(); //can use this cuz of Jackson Jars
		try {
			StepDay mappedSD = mapper.readValue(stepDayJSON, StepDay.class);
			sd.setSteps(mappedSD.getSteps());			
			return sd;// return if this works
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null; // if it fails, return null
	}

	@Override
	public boolean deleteStepDay(int id) {

		StepDay sd = em.find(StepDay.class, id);
		
		if(sd != null) {
			em.remove(sd);	
			return true;
		}
		else {			
			return false;
		}	
	}
	

}
