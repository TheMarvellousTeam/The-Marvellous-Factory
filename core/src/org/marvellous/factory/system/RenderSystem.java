package org.marvellous.factory.system;

import java.util.Comparator;

import org.marvellous.factory.component.Renderable;

import com.badlogic.ashley.core.Entity;
import com.badlogic.ashley.core.Family;
import com.badlogic.ashley.systems.SortedIteratingSystem;

public class RenderSystem extends SortedIteratingSystem {

	@SuppressWarnings("unchecked")
	public RenderSystem() {
		super(Family.all(Renderable.class).get(), new Comparator<Entity>() {
			@Override
			public int compare(Entity e1, Entity e2) {
				return Renderable.mapper.get(e1).getLayout()
						.compareTo(Renderable.mapper.get(e2).getLayout());
			}
		});
	}

	@Override
	protected void processEntity(Entity entity, float deltaTime) {
		// TODO Auto-generated method stub

	}

}
