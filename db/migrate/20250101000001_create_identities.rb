class CreateIdentities < ActiveRecord::Migration[8.0]
  def change
    create_table :identities do |t|
      t.string :provider, null: false
      t.string :uid, null: false
      t.string :password_digest
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :identities, %i[provider uid], unique: true
  end
end
