package org.marvellous.factory.system;

import java.util.Comparator;

import org.marvellous.factory.component.Renderable;

import com.badlogic.ashley.core.Entity;
import com.badlogic.ashley.core.Family;
import com.badlogic.ashley.systems.SortedIteratingSystem;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

/**
 * Quick implementation of the painter's algorithm thanks to
 * SortedIteratingSystem.
 * 
 * @author NiZiL
 *
 */
public class RenderSystem extends SortedIteratingSystem {

	/**
	 * RenderLayout are used for the painter's algorithm.
	 * 
	 * @author NiZiL
	 *
	 */
	public static enum RenderLayout {

	}

	private SpriteBatch batch;

	@SuppressWarnings("unchecked")
	public RenderSystem(SpriteBatch batch) {
		super(Family.one(Renderable.class).get(), new Comparator<Entity>() {
			@Override
			public int compare(Entity e1, Entity e2) {
				return Renderable.mapper.get(e1).getLayout()
						.compareTo(Renderable.mapper.get(e2).getLayout());
			}
		});
		this.batch = batch;
	}

	@Override
	protected void processEntity(Entity entity, float deltaTime) {
		Renderable.mapper.get(entity).render(batch, deltaTime);
	}

}
