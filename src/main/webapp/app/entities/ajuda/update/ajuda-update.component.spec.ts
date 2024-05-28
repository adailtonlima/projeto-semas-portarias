import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITopico } from 'app/entities/topico/topico.model';
import { TopicoService } from 'app/entities/topico/service/topico.service';
import { AjudaService } from '../service/ajuda.service';
import { IAjuda } from '../ajuda.model';
import { AjudaFormService } from './ajuda-form.service';

import { AjudaUpdateComponent } from './ajuda-update.component';

describe('Ajuda Management Update Component', () => {
  let comp: AjudaUpdateComponent;
  let fixture: ComponentFixture<AjudaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ajudaFormService: AjudaFormService;
  let ajudaService: AjudaService;
  let topicoService: TopicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AjudaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AjudaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AjudaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ajudaFormService = TestBed.inject(AjudaFormService);
    ajudaService = TestBed.inject(AjudaService);
    topicoService = TestBed.inject(TopicoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Topico query and add missing value', () => {
      const ajuda: IAjuda = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const topicos: ITopico[] = [{ id: '8687a987-70f9-40cd-a34b-a3a11727a9ed' }];
      ajuda.topicos = topicos;

      const topicoCollection: ITopico[] = [{ id: '1a2c8e71-05c7-4b80-95a5-8c31ba57d87e' }];
      jest.spyOn(topicoService, 'query').mockReturnValue(of(new HttpResponse({ body: topicoCollection })));
      const additionalTopicos = [...topicos];
      const expectedCollection: ITopico[] = [...additionalTopicos, ...topicoCollection];
      jest.spyOn(topicoService, 'addTopicoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ajuda });
      comp.ngOnInit();

      expect(topicoService.query).toHaveBeenCalled();
      expect(topicoService.addTopicoToCollectionIfMissing).toHaveBeenCalledWith(
        topicoCollection,
        ...additionalTopicos.map(expect.objectContaining),
      );
      expect(comp.topicosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ajuda: IAjuda = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
      const topicos: ITopico = { id: 'fa5cc903-9bc9-4f1b-b232-0d9def150784' };
      ajuda.topicos = [topicos];

      activatedRoute.data = of({ ajuda });
      comp.ngOnInit();

      expect(comp.topicosSharedCollection).toContain(topicos);
      expect(comp.ajuda).toEqual(ajuda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAjuda>>();
      const ajuda = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(ajudaFormService, 'getAjuda').mockReturnValue(ajuda);
      jest.spyOn(ajudaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ajuda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ajuda }));
      saveSubject.complete();

      // THEN
      expect(ajudaFormService.getAjuda).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ajudaService.update).toHaveBeenCalledWith(expect.objectContaining(ajuda));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAjuda>>();
      const ajuda = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(ajudaFormService, 'getAjuda').mockReturnValue({ id: null });
      jest.spyOn(ajudaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ajuda: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ajuda }));
      saveSubject.complete();

      // THEN
      expect(ajudaFormService.getAjuda).toHaveBeenCalled();
      expect(ajudaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAjuda>>();
      const ajuda = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
      jest.spyOn(ajudaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ajuda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ajudaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTopico', () => {
      it('Should forward to topicoService', () => {
        const entity = { id: '9fec3727-3421-4967-b213-ba36557ca194' };
        const entity2 = { id: '1361f429-3817-4123-8ee3-fdf8943310b2' };
        jest.spyOn(topicoService, 'compareTopico');
        comp.compareTopico(entity, entity2);
        expect(topicoService.compareTopico).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
