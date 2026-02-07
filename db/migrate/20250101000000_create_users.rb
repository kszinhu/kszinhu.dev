class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.text :bio
      t.string :avatar

      t.timestamps
    end
  end
end
